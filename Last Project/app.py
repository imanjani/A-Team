# Import dependencies
from flask import Flask, render_template, jsonify, redirect

import os
import pandas as pd





##############################################################################

app = Flask(__name__)

#################################################
# Routes
#################################################

# Main route 
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/map')
def heatmap():
    
    return render_template('map.html')

@app.route('/viz')
def viz():
    
    return render_template('viz.html')

@app.route('/learn')
def learn():
    
    return render_template('learn.html')





if __name__ == "__main__":
    app.run(debug=True)
