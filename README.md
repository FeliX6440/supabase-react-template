1) git clone this repo
2) cd into it
3) npm i

THEN:

1) Create your supabase database and paste the relevant values inside the .env file (like in the .env.example)
2) configure your confirmation email template inside supabase so it sends a {.Token}

THEN:

1) npm run dev
2) create your first account ;)



# features

**signup:**
fields: 
1) First Name,
2) Last Name,
3) Email,
4) Password
-> when signing up, confirmation code page opens. when reloaded, back to "/register".
-> then, when attempting to log in (as unconfirmed account), confirmation code window re-appears with a second button "request code again"

**signin**:
fields:
1) First Name,
2) Last Name

**authenticated route**:
dashboard 

The whole thing uses useSession and createSession


ENJOY

 
