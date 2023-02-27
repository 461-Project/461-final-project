from flask import Flask
from flask import render_template
import userDatabase

app = Flask(__name__)

app.config['static_file_mimetypes'] = {
    '.js': 'application/javascript',
    '.css': 'text/css'
}
@app.route('/')
def index():
    return render_template('index.html')


@app.route('/project-login-attempt')
def sign_into_project():
    return


@app.route('/projects-signin-page')
def open_proj_page():
    return render_template('projects_signin_page.html')


@app.route('/create-account-page')
def new_account_page():
    return render_template('create_account.html')


@app.route('/create-account', methods=['POST'])
def create_account():
    result = userDatabase.create_account(request.form['username'], request.form['password'], request.form['confirm_password'])
    return result


@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')


@app.route('/login-attempt', methods=['POST'])
def login():
    result = userDatabase.login(request.form['username'], request.form['password'])
    return result





if __name__ == '__main__':
    app.run()
