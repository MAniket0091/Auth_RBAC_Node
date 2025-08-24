const jwt = require('jsonwebtoken');


const generateTokens = async (user) => {

    let token = await jwt.sign({ data: 
        { email: user?.email, id: user._id } }, 
        'LOGIN_SECRET', 
        { expiresIn: 60 * 60 }
);

    let refreshToken = await await jwt.sign({data:
        {email:user?.email,id:user._id}}, 
        'LOGIN_SECRET',
        {expiresIn:'7d'}
);

return {token,refreshToken}
}

module.exports = {generateTokens};
