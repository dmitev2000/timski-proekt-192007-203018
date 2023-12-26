# About our project

#### *Authentication with Bearer Token*
This project utilizes Bearer Token authentication to secure access to its resources. Bearer Token is a simple, yet effective, method for authenticating API requests. This README.md provides an overview of how authentication is implemented using Bearer Tokens in this project.

#### *What is Bearer Token?*
Bearer Token is a type of access token that is sent with each HTTP request to authenticate the identity of the client. In this project, a Bearer Token is used as a credential to access protected resources. The token is included in the request header, providing a secure and standardized way to authenticate API requests.

#### *How to Obtain a Bearer Token*
To obtain a Bearer Token, users typically need to authenticate themselves through logging in with valid credentials. Once authenticated, the server issues a Bearer Token to the client. This token must be included in the Authorization header of subsequent requests to access protected resources.

#### *Token Expiry*
It's important to note that Bearer Tokens issued in this project have a validity period of 365 days. After this period, the tokens will expire, and users will need to re-authenticate to obtain a new token.

Additionally, if a user logs out or revokes access, the associated Bearer Token becomes invalid immediately. This enhances the security of the authentication process and helps protect user accounts.