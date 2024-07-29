// routes/flashSaleRoutes.js
const router = require ('express').Router();

const{verifyAccessToken, isAdmin} = require('../middlewares/verifyToken')
const flashSaleController = require('../controllers/flashSaleController');


// Endpoint để kiểm tra trạng thái flash sale
router.post('/create',[verifyAccessToken, isAdmin], flashSaleController.createFlashSale);
router.get('/send-notification',[verifyAccessToken, isAdmin], flashSaleController.sendNotification);
router.get('/', flashSaleController.getFlashSales);
router.put('/:fid',[verifyAccessToken, isAdmin], flashSaleController.updateFlashSale);
router.delete('/:fid',[verifyAccessToken, isAdmin], flashSaleController.deleteFlashSale);
module.exports = router;
