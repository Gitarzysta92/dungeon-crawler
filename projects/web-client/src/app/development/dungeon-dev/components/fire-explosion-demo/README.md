# 🔥 Fire Explosion Demo

A development demo component for testing the enhanced fire explosion animation system.

## 🎮 Features

### Interactive Controls
- **Target Buttons**: Fire at specific targets (3 different positions)
- **Random Target**: Fire at a random target
- **Multiple Explosions**: Fire 3 explosions in sequence
- **Auto Play**: Continuous random explosions every 3 seconds
- **Reset**: Clear explosion counter and stop auto-play

### Enhanced Animation Features
- ⚡ **40% faster fireball travel** (300ms instead of 500ms)
- 💥 **80 particles per explosion** (increased from 50)
- 🌟 **Custom fire shader** with realistic effects
- 📹 **Enhanced camera shake** with horizontal movement
- ⚡ **Shockwave effect** for extra impact
- 🔥 **Dynamic lighting** and particle physics

## 🚀 How to Access

1. Navigate to the development menu
2. Click on "Fire Explosion Demo"
3. Or go directly to: `/dungeon/fire-explosion-demo`

## 🎯 Demo Scene Layout

The demo creates a simple scene with:
- **Caster Position**: Center (0, 0.5, 0)
- **Target 1**: Right (3, 0.5, 0)
- **Target 2**: Left-back (-3, 0.5, 2)
- **Target 3**: Back (0, 0.5, -4)

## 🔧 Technical Details

### Animation System
- Uses the enhanced `AnimationPlayerComponent`
- Custom `ExplosionParticleAnimation` class
- Real-time shader uniform updates
- Particle physics with gravity and turbulence

### Shader Features
- **Fire Explosion Fragment Shader**: Realistic fire with multiple noise layers
- **Dynamic Color Gradients**: Hot core to cool edges
- **Flickering and Heat Distortion**: Realistic fire behavior
- **Smoke Blending**: Cooler areas show smoke effects

### Performance
- Optimized particle count (80 particles)
- Efficient shader compilation
- Proper cleanup of resources
- Responsive UI with loading states

## 🎨 UI Features

- **Modern Game-like Interface**: Dark theme with gradient backgrounds
- **Real-time Statistics**: Explosion counter and status
- **Responsive Design**: Works on desktop and mobile
- **Visual Feedback**: Button states and animations
- **Information Panel**: Usage instructions and feature list

## 🔄 Development Workflow

1. **Test Individual Effects**: Use target buttons to test specific animations
2. **Stress Test**: Use auto-play to test continuous explosions
3. **Performance Monitor**: Watch for frame drops or memory leaks
4. **Compare Effects**: Use multiple explosions to see particle interactions

## 🐛 Troubleshooting

- **Animation not playing**: Check browser console for errors
- **Performance issues**: Reduce particle count in the shader
- **Shader not loading**: Ensure all shader files are properly imported
- **Scene not rendering**: Check if scene container is properly connected

## 📝 Future Enhancements

- [ ] Add more particle types (sparks, debris)
- [ ] Implement sound effects
- [ ] Add configuration panel for parameters
- [ ] Create different explosion types
- [ ] Add performance metrics display 