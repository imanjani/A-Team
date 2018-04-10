# Import dependencies
from flask import Flask, render_template, jsonify, redirect

import os
import pandas as pd

from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from sqlalchemy import func, or_, and_
from sqlalchemy import desc





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






if __name__ == "__main__":
    app.run(debug=True)
