import { InjectionToken } from '@angular/core';

export const policies = {
  login: `By creating an account and using our service, you agree to our Terms and Conditions. 
  Please review our <a target='_blank'>Terms and conditions</a> carefully before proceeding. 
  If you have any questions or concerns, please contact us.`
};

export type AuthPolicies = typeof policies;
export const PoliciesToken = new InjectionToken<AuthPolicies>('auth.policies');