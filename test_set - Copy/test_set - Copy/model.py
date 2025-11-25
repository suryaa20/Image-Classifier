import tensorflow as tf
import numpy as np
import matplotlib.pyplot as plt
from tensorflow.keras.preprocessing import image


model = tf.keras.models.load_model("models/Selfimageclassifier.h5")


model.summary()
print(f"Model expected input shape: {model.input_shape}")


IMG_SIZE = 256  

def preprocess_image(img_path):
    img = image.load_img(img_path, target_size=(IMG_SIZE, IMG_SIZE))  # Resize correctly
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
    img_array = img_array / 255.0  # Normalize
    return img_array

img_path = 'test_set/i - 4.png'  
img_array = preprocess_image(img_path)

#image_261,42
print(f"Image shape after preprocessing: {img_array.shape}")  


predictions = model.predict(img_array)


predicted_class = np.argmax(predictions, axis=1)[0]


class_names = ['digital_art', 'painting', 'sculpture']  # Ensure these match training labels
predicted_label = class_names[predicted_class]


print(f"The predicted class for the image is: {predicted_label}")


img = image.load_img(img_path)
plt.imshow(img)
plt.title(f"Predicted: {predicted_label}")
plt.axis('off')
plt.show()