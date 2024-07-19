const router = require ('express').Router();

const{verifyAccessToken, isAdmin} = require('../middlewares/verifyToken')
const ctrls = require ('../controllers/order')


router.get('/',verifyAccessToken, ctrls.getUserOrder)
router.post('/',verifyAccessToken, ctrls.createNewOrder)
router.get('/admin',verifyAccessToken,isAdmin, ctrls.getOrders)




router.put('/status/:oid',verifyAccessToken,isAdmin, ctrls.updateStatus)
module.exports = router