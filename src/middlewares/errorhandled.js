const {requiredBodyError} = require('../helpers/errorHandling');
const requiredFields = (fields) => {
    return (req, _res, next) => {
        const missingFields = [];
        const keys = Object.keys(req.body); // Included fields
    
            // Checks if every required field is in the body
        for(const field of fields)
        if(!keys.includes(field))
            missingFields.push(field)
    
            // If there are missing fields then run next error middleware
        if(missingFields.length)
        return next(new requiredBodyError(missingFields));
        
            // If no missing fields then run router code
        return next();
    }
}
      
module.exports = {
    requiredFields,
} 