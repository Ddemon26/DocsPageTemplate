# Authentication

Learn how to add authentication and access control to your documentation site.

## Overview

While the basic documentation site is public, you may want to add authentication for:

- Private documentation
- User-specific content
- Analytics and tracking
- Content personalization

## Basic Authentication

### Simple Password Protection

Add basic password protection with JavaScript:

```javascript
class AuthenticatedDocsApp extends DocsApp {
    constructor() {
        super();
        this.isAuthenticated = false;
        this.checkAuthentication();
    }
    
    checkAuthentication() {
        const token = localStorage.getItem('docs-auth-token');
        if (!token || !this.validateToken(token)) {
            this.showLoginForm();
            return;
        }
        this.isAuthenticated = true;
    }
    
    showLoginForm() {
        const content = document.getElementById('content');
        content.innerHTML = `
            <div class="auth-form">
                <h2>Authentication Required</h2>
                <form onsubmit="app.authenticate(event)">
                    <input type="password" id="password" placeholder="Enter password" required>
                    <button type="submit">Access Documentation</button>
                </form>
            </div>
        `;
    }
    
    authenticate(event) {
        event.preventDefault();
        const password = document.getElementById('password').value;
        
        if (this.validatePassword(password)) {
            const token = this.generateToken();
            localStorage.setItem('docs-auth-token', token);
            this.isAuthenticated = true;
            this.initializeApp();
        } else {
            alert('Invalid password');
        }
    }
    
    validatePassword(password) {
        // Simple password check - use environment variables in production
        return password === 'your-secret-password';
    }
    
    generateToken() {
        return btoa(Date.now() + Math.random());
    }
    
    validateToken(token) {
        // Add token validation logic
        return token && token.length > 0;
    }
}
```

### Environment-Based Authentication

Use different authentication methods based on environment:

```javascript
class ConfigurableAuth {
    constructor() {
        this.authMethod = this.getAuthMethod();
    }
    
    getAuthMethod() {
        // Check if running on GitHub Pages
        if (window.location.hostname.includes('github.io')) {
            return 'github';
        }
        
        // Check for custom domain
        if (window.location.hostname === 'docs.yourcompany.com') {
            return 'oauth';
        }
        
        // Default to no auth for localhost
        return 'none';
    }
    
    async authenticate() {
        switch (this.authMethod) {
            case 'github':
                return await this.githubAuth();
            case 'oauth':
                return await this.oauthAuth();
            default:
                return true; // No auth required
        }
    }
}
```

## OAuth Integration

### GitHub OAuth

Integrate with GitHub for user authentication:

```javascript
class GitHubAuth {
    constructor(clientId) {
        this.clientId = clientId;
        this.redirectUri = window.location.origin;
    }
    
    login() {
        const authUrl = `https://github.com/login/oauth/authorize?` +
            `client_id=${this.clientId}&` +
            `redirect_uri=${encodeURIComponent(this.redirectUri)}&` +
            `scope=user:email`;
        
        window.location.href = authUrl;
    }
    
    async handleCallback() {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        
        if (code) {
            try {
                const token = await this.exchangeCodeForToken(code);
                const user = await this.getUserInfo(token);
                this.storeUserSession(user, token);
                return user;
            } catch (error) {
                console.error('Authentication failed:', error);
                return null;
            }
        }
        return null;
    }
    
    async exchangeCodeForToken(code) {
        // This would typically be done on your backend
        // For client-side only, you'd need a proxy service
        const response = await fetch('/api/auth/github', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code })
        });
        
        const data = await response.json();
        return data.access_token;
    }
    
    async getUserInfo(token) {
        const response = await fetch('https://api.github.com/user', {
            headers: { 'Authorization': `token ${token}` }
        });
        return await response.json();
    }
    
    storeUserSession(user, token) {
        localStorage.setItem('github-user', JSON.stringify(user));
        localStorage.setItem('github-token', token);
    }
}
```

### Google OAuth

Integrate with Google for authentication:

```html
<!-- Add Google OAuth script -->
<script src="https://accounts.google.com/gsi/client" async defer></script>
```

```javascript
class GoogleAuth {
    constructor(clientId) {
        this.clientId = clientId;
        this.initializeGoogleAuth();
    }
    
    initializeGoogleAuth() {
        window.onload = () => {
            google.accounts.id.initialize({
                client_id: this.clientId,
                callback: this.handleCredentialResponse.bind(this)
            });
            
            google.accounts.id.renderButton(
                document.getElementById('google-signin'),
                { theme: 'outline', size: 'large' }
            );
        };
    }
    
    handleCredentialResponse(response) {
        const credential = this.parseJwt(response.credential);
        this.storeUserSession(credential);
        this.onAuthSuccess(credential);
    }
    
    parseJwt(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        
        return JSON.parse(jsonPayload);
    }
    
    storeUserSession(user) {
        localStorage.setItem('google-user', JSON.stringify(user));
    }
    
    onAuthSuccess(user) {
        console.log('Authenticated user:', user);
        // Initialize the documentation app
        this.initializeDocsApp();
    }
}
```

## Role-Based Access

### User Roles

Implement role-based access control:

```javascript
class RoleBasedAuth {
    constructor() {
        this.userRoles = new Map();
        this.pagePermissions = new Map();
        this.loadPermissions();
    }
    
    loadPermissions() {
        // Define page permissions
        this.pagePermissions.set('docs/admin/', ['admin']);
        this.pagePermissions.set('docs/internal/', ['admin', 'employee']);
        this.pagePermissions.set('docs/public/', ['admin', 'employee', 'user']);
    }
    
    hasAccess(userRoles, pagePath) {
        const requiredRoles = this.getRequiredRoles(pagePath);
        if (!requiredRoles.length) return true; // Public page
        
        return requiredRoles.some(role => userRoles.includes(role));
    }
    
    getRequiredRoles(pagePath) {
        for (const [path, roles] of this.pagePermissions) {
            if (pagePath.startsWith(path)) {
                return roles;
            }
        }
        return []; // No specific permissions required
    }
    
    filterNavigation(navigation, userRoles) {
        return navigation.map(section => ({
            ...section,
            items: section.items.filter(item => 
                this.hasAccess(userRoles, item.path)
            )
        })).filter(section => section.items.length > 0);
    }
}
```

### Permission Checking

Add permission checks to the main app:

```javascript
class SecureDocsApp extends DocsApp {
    constructor() {
        super();
        this.auth = new RoleBasedAuth();
        this.currentUser = this.getCurrentUser();
    }
    
    async loadDoc(path) {
        // Check permissions before loading
        if (!this.auth.hasAccess(this.currentUser.roles, path)) {
            this.showAccessDenied(path);
            return;
        }
        
        // Proceed with normal loading
        await super.loadDoc(path);
    }
    
    showAccessDenied(path) {
        const content = document.getElementById('content');
        content.innerHTML = `
            <div class="error">
                <h1>Access Denied</h1>
                <p>You don't have permission to view: ${path}</p>
                <p>Required roles: ${this.auth.getRequiredRoles(path).join(', ')}</p>
                <p>Your roles: ${this.currentUser.roles.join(', ')}</p>
            </div>
        `;
    }
    
    getCurrentUser() {
        const userData = localStorage.getItem('user-session');
        return userData ? JSON.parse(userData) : { roles: ['anonymous'] };
    }
    
    renderNavigation() {
        // Filter navigation based on user permissions
        const filteredNavigation = this.auth.filterNavigation(
            this.navigation, 
            this.currentUser.roles
        );
        
        // Render filtered navigation
        this.renderFilteredNavigation(filteredNavigation);
    }
}
```

## Session Management

### Session Storage

Manage user sessions securely:

```javascript
class SessionManager {
    constructor() {
        this.sessionKey = 'docs-session';
        this.sessionTimeout = 24 * 60 * 60 * 1000; // 24 hours
    }
    
    createSession(user, token) {
        const session = {
            user,
            token,
            createdAt: Date.now(),
            expiresAt: Date.now() + this.sessionTimeout
        };
        
        localStorage.setItem(this.sessionKey, JSON.stringify(session));
        return session;
    }
    
    getSession() {
        const sessionData = localStorage.getItem(this.sessionKey);
        if (!sessionData) return null;
        
        const session = JSON.parse(sessionData);
        
        // Check if session is expired
        if (Date.now() > session.expiresAt) {
            this.clearSession();
            return null;
        }
        
        return session;
    }
    
    refreshSession() {
        const session = this.getSession();
        if (session) {
            session.expiresAt = Date.now() + this.sessionTimeout;
            localStorage.setItem(this.sessionKey, JSON.stringify(session));
        }
    }
    
    clearSession() {
        localStorage.removeItem(this.sessionKey);
    }
    
    isAuthenticated() {
        return this.getSession() !== null;
    }
}
```

### Auto-logout

Implement automatic logout on inactivity:

```javascript
class ActivityTracker {
    constructor(timeoutMinutes = 30) {
        this.timeout = timeoutMinutes * 60 * 1000;
        this.lastActivity = Date.now();
        this.warningShown = false;
        
        this.setupActivityListeners();
        this.startInactivityTimer();
    }
    
    setupActivityListeners() {
        const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
        
        events.forEach(event => {
            document.addEventListener(event, () => {
                this.updateActivity();
            }, true);
        });
    }
    
    updateActivity() {
        this.lastActivity = Date.now();
        this.warningShown = false;
    }
    
    startInactivityTimer() {
        setInterval(() => {
            const inactiveTime = Date.now() - this.lastActivity;
            
            // Show warning at 5 minutes before timeout
            if (inactiveTime > this.timeout - 5 * 60 * 1000 && !this.warningShown) {
                this.showInactivityWarning();
                this.warningShown = true;
            }
            
            // Logout on timeout
            if (inactiveTime > this.timeout) {
                this.handleInactivityLogout();
            }
        }, 60000); // Check every minute
    }
    
    showInactivityWarning() {
        if (confirm('You will be logged out in 5 minutes due to inactivity. Click OK to stay logged in.')) {
            this.updateActivity();
        }
    }
    
    handleInactivityLogout() {
        alert('You have been logged out due to inactivity.');
        sessionManager.clearSession();
        window.location.reload();
    }
}
```

## Security Considerations

### Best Practices

1. **Never store sensitive data in localStorage**
   ```javascript
   // Bad
   localStorage.setItem('password', password);
   
   // Good
   localStorage.setItem('session-token', hashedToken);
   ```

2. **Validate tokens server-side**
   ```javascript
   async validateToken(token) {
       const response = await fetch('/api/validate-token', {
           method: 'POST',
           headers: { 'Authorization': `Bearer ${token}` }
       });
       return response.ok;
   }
   ```

3. **Use HTTPS in production**
   ```javascript
   if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
       location.replace(`https:${location.href.substring(location.protocol.length)}`);
   }
   ```

4. **Implement CSRF protection**
   ```javascript
   const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
   
   fetch('/api/endpoint', {
       method: 'POST',
       headers: {
           'X-CSRF-Token': csrfToken,
           'Content-Type': 'application/json'
       },
       body: JSON.stringify(data)
   });
   ```

## Next Steps

- Implement your chosen authentication method
- Set up proper session management
- Configure role-based access control
- Test security measures thoroughly
- Consider using a backend service for production authentication