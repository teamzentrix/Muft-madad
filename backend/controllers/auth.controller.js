// controllers/authController.js or routes/auth.js
const authService = require("../auth/auth.service") // adjust path as needed

// Signup endpoint
exports.signupController = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        const result = await authService.signupService({ name, email, phone, password });

        // Set HTTP-only cookie
        res.cookie('authToken', result.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        // Send response (without token in body since it's in cookie)
        res.status(201).json({
            message: result.message,
            user: result.user
        });

    } catch (error) {
        console.error('Signup error:', error);

        const statusCode = error.statusCode || 500;
        const response = {
            message: error.message || 'Server error. Please try again later.'
        };

        // Add field info if available
        if (error.field) {
            response.field = error.field;
        }

        res.status(statusCode).json(response);
    }
};


// Login endpoint
exports.loginController = async (req, res) => {
    try {
        const { email, password, rememberMe } = req.body;

        const result = await authService.loginService({ email, password, rememberMe });

        // Set HTTP-only cookie
        const maxAge = rememberMe 
            ? 30 * 24 * 60 * 60 * 1000  // 30 days
            : 24 * 60 * 60 * 1000;       // 1 day

        res.cookie('authToken', result.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge
        });

        // Send response
        res.status(200).json({
            message: result.message,
            user: result.user
        });

    } catch (error) {
        console.error('Login error:', error);

        const statusCode = error.statusCode || 500;
        const response = {
            message: error.message || 'Server error. Please try again later.'
        };

        if (error.field) {
            response.field = error.field;
        }

        res.status(statusCode).json(response);
    }
};


// Logout endpoint
exports.logoutController = async (req, res) => {
    try {
        await authService.logout();

        // Clear cookie
        res.clearCookie('authToken');

        res.status(200).json({ message: 'Logged out successfully' });

    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


// Check auth endpoint
exports.checkAuthController = async (req, res) => {
    try {
        const token = req.cookies.authToken;

        const result = await authService.verifyToken(token);

        res.status(200).json({ user: result.user });

    } catch (error) {
        console.error('Auth check error:', error);

        const statusCode = error.statusCode || 401;
        res.status(statusCode).json({ 
            message: error.message || 'Not authenticated' 
        });
    }
};