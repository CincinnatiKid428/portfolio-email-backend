# 📬 portfolio-email-backend

## Description:
This project consists of a backend API server that simply sends an email with provided 
data in the request.  It was used in conjunction with a contact form in my online portfolio 
to send messages to me via email.

## How to Use this Project:
### 📋 Requirements:
- Account with [Resend](https://www.resend.com)
- A host for this project (Vercel, Render, Heroku, or your own domain) if you want this web service available online

### 🛠 Setup
1. Clone the repository into your own project folder.
2. Run `npm install` from the root folder to install dependencies.
3. Create an API key in your Resend account:
   
   <img width="1318" height="369" alt="image" src="https://github.com/user-attachments/assets/37ea573e-70ae-46b8-a744-c1bb9ed928cf" />
   Click "+ Create API key" and give the key a name, permissions and domain access.
   
5. If you own your domain, you will need to add it by selecting "Domains" from the menu and Clicking "Add domain" -- (If don't own your domain skip to Step 5).
   
   <img width="860" height="536" alt="image" src="https://github.com/user-attachments/assets/d11ee406-31ce-452c-b8f6-8b0429f107df" />
   <br><br>
   After entering your domain you will be given DNS entries to add to verify your domain with Resend:
   <br><br>
   <img width="1198" height="711" alt="image" src="https://github.com/user-attachments/assets/7fac5efc-f2cf-4376-b124-5dc30c419dfd" />
   
6. Create your `.env` config file or set environment variables on your host as follows:
    ```
       EMAIL_TO=your-email@someplace.com       #Where you want the emails to be sent
       EMAIL_FROM=your-email@someplace.com     #Use same email if verified domain, otherwise set this to 'onboarding@resend.dev'
       RESEND_API_KEY=your-api-key             #(From Step 3)
       LOGGING=false                           #true/false to enable/disable logging on server
       ALLOW_DOMAIN=https://your-frontend.com  #Restrics domain access to API (separate multiple entries with a comma)
       PORT=1234                               #(Optional: If configurable on host)
    ```
7. You will need to find the URL from your host to access the server, once you find it you can use the `/contact` API endpoint to invoke the function to send an email. For example `http://localhost:5000/contact` for dev or `https://your-api-server:1234/contact` for a live host.  _Note: `http` used on dev, but it is recommended to stay with `https` for live servers as a security precaution._<br><br>
   The endpoint expects a JSON object in the request body with the following format:
    ```json
     {
       name: "Tyler Durden",
       email: "soapguy@paperstreetsoapco.com",
       phone: "288-555-0153",
       message: "We are running low on lye again."
     }
    ```
   Frontend example API call:
    ```js
      const response = await fetch(EMAIL_SERVER_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ name, email, phone, message })
      });
    ```

## 🤖 Technologies Used
- Node.js
- Express.js
- [Resend](https://www.resend.com)
