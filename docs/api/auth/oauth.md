# OAuth 2.0 Authentication

Learn how to implement OAuth 2.0 authentication for your documentation site.

## Overview

OAuth 2.0 is an authorization framework that enables applications to obtain limited access to user accounts. It works by delegating user authentication to the service that hosts the user account.

## Supported Providers

- GitHub OAuth
- Google OAuth  
- Microsoft OAuth
- Custom OAuth providers

## Implementation

### GitHub OAuth Setup

1. **Register your application** on GitHub:
   - Go to Settings > Developer settings > OAuth Apps
   - Click "New OAuth App"
   - Fill in application details

2. **Configure your application**:
   ```javascript
   const githubAuth = new GitHubAuth({
       clientId: 'your-client-id',
       redirectUri: 'https://yourdomain.com/callback'
   });
   ```

3. **Handle the authentication flow**:
   ```javascript
   // Initiate login
   githubAuth.login();
   
   // Handle callback
   const user = await githubAuth.handleCallback();
   ```

### Google OAuth Setup

1. **Create a project** in Google Cloud Console
2. **Enable the Google+ API**
3. **Create OAuth 2.0 credentials**
4. **Configure your application**:
   ```javascript
   const googleAuth = new GoogleAuth({
       clientId: 'your-google-client-id'
   });
   ```

## Configuration Options

| Option | Type | Description |
|--------|------|-------------|
| `clientId` | string | OAuth application client ID |
| `redirectUri` | string | Callback URL after authentication |
| `scope` | string | Requested permissions |
| `state` | string | Security parameter to prevent CSRF |

## Error Handling

Common OAuth errors and solutions:

- **Invalid client**: Check your client ID configuration
- **Redirect URI mismatch**: Ensure callback URL matches registration
- **Access denied**: User declined authorization
- **Invalid grant**: Authorization code expired or invalid

## Security Considerations

- Always validate the `state` parameter
- Use HTTPS for all OAuth flows
- Store tokens securely
- Implement proper token refresh logic
- Validate tokens server-side when possible

## Next Steps

- Review [API Keys](api-keys.md) as an alternative
- Check the [Authentication Overview](overview.md)
- Explore the main [Authentication](../authentication.md) guide