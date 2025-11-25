import tensorflow as tf
import numpy as np
import matplotlib.pyplot as plt
from tensorflow.keras.preprocessing import image

#  Load the trained model (Ensure correct path)
model = tf.keras.models.load_model("models/Selfimageclassifier.h5")

#  Print model summary to verify input shape
model.summary()
print(f"Model expected input shape: {model.input_shape}")

#  Ensure correct image size (256x256 since your model was trained on this size)
IMG_SIZE = 256  

def preprocess_image(img_path):
    img = image.load_img(img_path, target_size=(IMG_SIZE, IMG_SIZE))  # Resize correctly
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
    img_array = img_array / 255.0  # Normalize
    return img_array
