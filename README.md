# 🚀 Welcome to your new awesome project!

This project has been created using **webpack-cli**, you can now run

```
npm run build
```

or

```
yarn build
```

to bundle your application


    <div class='container'>
        <div class='section'>
            <h1>Supabase Auth Example</h1>
        </div>
        <div class='section'>
            <form id='sign-up'>
                <h3>Sign Up</h3>
                <label>Email</label><input type='email' name='email' />
                <label>Password</label><input type='password' name='password' />
                <input type='submit'>
            </form>
        </div>
        <div class='section'>
            <form id='log-in'>
                <h3>Log In</h3>
                <label>Email</label><input type='email' name='email' />
                <label>Password</label><input type='password' name='password' />
                <input type='submit'>
            </form>
        </div>
        <div class='section'>
            <h3>Select board</h3>
            <select id="boards-list"></select>
            Or
            <button id="create-board-button">Create new one</button>
        </div>
        <div class='section'>
            <h3>Logout</h3>
            <button id='logout-button'>Logout</button>
        </div>
    </div>
    <div id='konva-container'></div>
    <button id="delete-button">DELETE SELECTED</button>
    <button id="new-image-button">NEW IMAGE</button>
    <button id="new-rect-button">NEW RECT</button>
    <button id="new-line-button">NEW LINE</button>