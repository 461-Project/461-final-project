import './App.css';

function App() {
  return (
    <div className="App">
      <div class="form-container">
        <h1>Login Page</h1>
        <form action="/login-attempt" method="POST">
          <label for="username">Username:</label>
          <input type="text" id="username" name="username" required></input>
          <label for="password">Password:</label>
          <input type="password" id="password" name="password" required></input>
          <button type="submit">Login</button>
          <button type="button" id="create_account">Create Account</button>
        </form>
        <div id="result"></div>
        <script type="text/javascript" src="{{ url_for('static', filename='script.js') }}"></script>
      </div>
    </div>
  );
}

export default App;
