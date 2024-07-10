
import { IActivity, IActivityCost, IActivitySubject } from "../../../base/activity/activity.interface";
import { NotEnumerable } from "../../../infrastructure/extensions/object-traverser";
import { Constructor } from "../../../infrastructure/extensions/types";
import { IMixin, IMixinFactory } from "../../../infrastructure/mixin/mixin.interface";
import { ICurrency } from "../entities/currency/currency.interface";
import { ICustomer } from "../entities/customer/customer.interface";
import { ITradable, ITradePrice } from "../entities/tradable/trade.interface";
import { IVendor } from "../entities/vendor/vendor.interface";
import { TRADE_ACTIVITY } from "../vendors.constants";


export class TradeActivityFactory implements IMixinFactory<IActivity> {

  constructor() { }

  public validate(a: IActivity): boolean {
    return a.isActivity && a.id === TRADE_ACTIVITY;
  }

  public create(c: Constructor<IMixin>): Constructor<IActivity> {
    class TradeActivity extends c implements IActivity {
      
      id: string;
      cost?: IActivityCost[];
      tradable: ITradable;
      isActivity = true as const;

      @NotEnumerable()
      subject: IActivitySubject;;;


      constructor(data: IActivity) {
        super(data);
        this.id = data.id;
        this.cost = data.cost;
      }
      
      public canBeDispatched(customer: ICustomer, vendor: IVendor, amount: number, isSelling = false): boolean {
        if (!customer || !vendor) {
          return false;
        }

        let possess = false;
        if (isSelling) {
          possess = customer.possessItem(this.tradable, amount);
        } else {
          possess = vendor.possessItem(this.tradable, amount);
          possess = this._calculateRequiredCurrency(customer, this.tradable.buyBasePrice)
            .every(p => customer.possessItem(p.currencyId, p.value))
        }
        return possess && customer.validateActivityResources(this.cost);
      }

      public dispatch(customer: ICustomer, vendor: IVendor, amount: number, isSelling = false): void {
        this.canBeDispatched(customer, vendor, amount, isSelling);
        if (isSelling) {
          customer.inventory.removeItem(this.tradable.id, amount);
          this._calculateRequiredCurrency(customer, this.tradable.sellBasePrice)
            .forEach(p => customer.inventory.addItem(p.currencyId, p.value))
        } else {
          customer.inventory.addItem(this.tradable.id, amount);
          this._calculateRequiredCurrency(customer, this.tradable.sellBasePrice)
            .forEach(p => customer.inventory.removeItem(p.currencyId, p.value))
          vendor.inventory.removeItem(this.tradable.id, amount);
        }
      }

      private _calculateRequiredCurrency(customer: ICustomer, price: ITradePrice[]): ITradePrice[] {
        return price.map(p => {
          const item = customer.inventory.getItem(p.currencyId) as unknown as ICurrency;
          return Object.assign(p, { value: Math.round(item.value / p.value) })
        })
      }
    }

    return TradeActivity;
  }

}