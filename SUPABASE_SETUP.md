# Supabase setup for Tetris

This adds email/password accounts and a public top-10 leaderboard. Each account gets one row containing its personal best score. Email addresses are never added to the leaderboard.

## 1. Create a Supabase project and database

1. Create a Supabase project and open its SQL Editor.
2. Paste and run the SQL in supabase/schema.sql.
3. Confirm the tetris_leaderboard table appears in the public schema.

The SQL enables row-level security. Anyone can read leaderboard rows; only authenticated users can call the score-saving function. That function uses the signed-in account ID and only replaces a record when the new score is higher.

## 2. Enable email/password login without email confirmation

In the Supabase dashboard:

1. Open Authentication, then Sign In / Providers, then Email.
2. Enable email/password signups.
3. Turn Confirm Email off.
4. In Authentication URL Configuration, set the Site URL to https://100yj-0911.github.io/20261105/ and add that same URL to the redirect URL allow list.

With Confirm Email off, a new account can sign in immediately without an email confirmation step. This is a project-wide Supabase Auth setting.

## 3. Add the browser credentials

In Supabase, open Project Settings, then API Keys. Copy the Project URL and the Publishable key (or legacy anon key). Put them in the TETRIS_SUPABASE_CONFIG object near the top of tetris.html:

    window.TETRIS_SUPABASE_CONFIG = {
      url: "https://YOUR_PROJECT_REF.supabase.co",
      anonKey: "YOUR_SUPABASE_PUBLISHABLE_OR_ANON_KEY"
    };

The publishable or anon key is intended for browser use when row-level security is enabled. Never put a service_role or secret key in this HTML file.

## 4. Use the game

Open the deployed page, create an account with a nickname, email, and password, then play. The game submits the run at game over. If a player was signed out when a run ended, the best pending run is kept until they sign in. The ranking shows the top 10 personal best scores.

The score is generated in the browser, so this setup protects account ownership and database writes but is not an anti-cheat system.
