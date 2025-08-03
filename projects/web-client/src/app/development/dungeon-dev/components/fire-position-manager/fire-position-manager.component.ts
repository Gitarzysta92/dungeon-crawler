import { Component, Input, OnInit } from '@angular/core';
import { Mesh } from 'three';

export interface FirePosition {
  x: number;
  y: number;
  z: number;
}

export interface FireData {
  fire: Mesh;
  index: number;
  position: FirePosition;
}

@Component({
  selector: 'app-fire-position-manager',
  templateUrl: './fire-position-manager.component.html',
  styleUrls: ['./fire-position-manager.component.scss']
})
export class FirePositionManagerComponent implements OnInit {
  @Input() fires: FireData[] = [];
  @Input() group: any;

  ngOnInit(): void {
    this.createFirePositionUI();
  }

  public createFirePositionUI(): void {
    // Create UI container if it doesn't exist
    let uiContainer = document.getElementById('fire-position-ui');
    if (!uiContainer) {
      uiContainer = document.createElement('div');
      uiContainer.id = 'fire-position-ui';
      uiContainer.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 15px;
        border-radius: 8px;
        font-family: monospace;
        font-size: 12px;
        max-height: 80vh;
        overflow-y: auto;
        z-index: 1000;
        border: 1px solid #333;
      `;
      document.body.appendChild(uiContainer);
    }

    // Clear existing content
    uiContainer.innerHTML = '<h3 style="margin: 0 0 10px 0;">🔥 Fire Position Manager</h3>';

    // Add controls for each fire
    this.fires.forEach((fireData, index) => {
      const fireContainer = document.createElement('div');
      fireContainer.style.cssText = `
        margin-bottom: 10px;
        padding: 8px;
        border: 1px solid #555;
        border-radius: 4px;
        background: rgba(255, 255, 255, 0.1);
      `;

      fireContainer.innerHTML = `
        <div style="margin-bottom: 5px;">
          <strong>Fire ${index + 1}</strong>
          <button onclick="window.removeFire(${index})" style="float: right; background: #ff4444; color: white; border: none; padding: 2px 6px; border-radius: 3px; cursor: pointer;">Remove</button>
        </div>
        <div style="margin-bottom: 5px;">
          <label>X: <input type="number" step="0.01" value="${fireData.position.x}" onchange="window.updateFirePosition(${index}, 'x', this.value)" style="width: 60px; background: #333; color: white; border: 1px solid #555; padding: 2px;"></label>
          <label>Y: <input type="number" step="0.01" value="${fireData.position.y}" onchange="window.updateFirePosition(${index}, 'y', this.value)" style="width: 60px; background: #333; color: white; border: 1px solid #555; padding: 2px;"></label>
          <label>Z: <input type="number" step="0.01" value="${fireData.position.z}" onchange="window.updateFirePosition(${index}, 'z', this.value)" style="width: 60px; background: #333; color: white; border: 1px solid #555; padding: 2px;"></label>
        </div>
      `;

      uiContainer.appendChild(fireContainer);
    });

    // Add export button
    const exportButton = document.createElement('button');
    exportButton.textContent = 'Export Positions';
    exportButton.style.cssText = `
      background: #4CAF50;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      margin-top: 10px;
      width: 100%;
    `;
    exportButton.onclick = () => this.exportPositions();
    uiContainer.appendChild(exportButton);

    // Add global functions for the UI
    (window as any).updateFirePosition = (index: number, axis: 'x' | 'y' | 'z', value: string) => {
      const fireData = this.fires[index];
      if (fireData) {
        fireData.position[axis] = parseFloat(value);
        fireData.fire.position[axis] = parseFloat(value);
        console.log(`Updated fire ${index + 1} ${axis} to ${value}`);
      }
    };

    (window as any).removeFire = (index: number) => {
      const fireData = this.fires[index];
      if (fireData && this.group) {
        this.group.remove(fireData.fire);
        this.fires.splice(index, 1);
        this.createFirePositionUI(); // Refresh UI
        console.log(`Removed fire ${index + 1}`);
      }
    };
  }

  private exportPositions(): void {
    const positions = this.fires.map(fire => fire.position);
    const json = JSON.stringify(positions, null, 2);
    console.log('Fire positions:', json);
    
    // Create download link
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'fire-positions.json';
    a.click();
    URL.revokeObjectURL(url);
    
    console.log('Fire positions exported to fire-positions.json');
  }
} 