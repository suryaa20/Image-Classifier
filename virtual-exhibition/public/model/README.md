# Art Classification Model

This directory contains a TensorFlow.js model for classifying artwork into three categories:

- Digital Art
- Painting
- Sculpture

## Model Files

- `model.json`: The main model architecture file
- `group1-shard*of4.bin`: Weight files for the model

## Model Information

This model was trained with TensorFlow/Keras and converted to TensorFlow.js format.

### Input Requirements

The model expects images with the following specifications:

- Size: 256x256 pixels
- Color channels: RGB (3 channels)
- Normalization: Values should be scaled to range [0,1]

### Output Format

The model outputs an array of 3 values, representing probabilities for each class:

1. Digital Art
2. Painting
3. Sculpture

## Updating the Model

If you need to replace this model with an updated version:

1. Make sure your new model is converted to TensorFlow.js format
2. Replace all files in this directory with your new model files
3. Ensure your model outputs match the expected categories ("Digital Art", "Painting", "Sculpture")
4. If your model has different output categories, update the `CATEGORIES` array in `src/utils/imageClassifier.ts`

## Troubleshooting

If you encounter model loading errors:

1. **Version Compatibility**: Ensure the TensorFlow.js version in `public/index.html` is compatible with your model version
2. **Input Shape Issues**: The model expects 256x256x3 input images
3. **Missing Files**: Verify all weight shard files are present
4. **CORS Issues**: When serving remotely, ensure proper CORS headers are set

### Fallback Behavior

The application includes fallback mechanisms if the model fails to load:

1. A simplified model will be created on-the-fly
2. If that fails, a mock classification system will be used

## Debugging

Set `localStorage.debug = "art-classifier:*"` in your browser console to enable detailed logging for the classifier.
