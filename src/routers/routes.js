const { Router } = require("express");
const registroController = require("../controllers/registroController");
const patrimonioController = require("../controllers/patrimonioController");
const viewController = require("../controllers/viewController")
const rateLimiter = require("../middlewares/rateLimiter");
const { verificar, validar } = require("../middlewares/autenticador");
const { resolver } = require("../middlewares/erro");
const router = Router();

// Páginas EJS

router.get("/", verificar, viewController.inicio);
router.get("/sair", verificar, viewController.sair);
router.get("/validar", resolver(viewController.validar));
router.get("/registrar", resolver(viewController.registrar));
router.get("/listar", verificar, resolver(viewController.listar));
router.get("/registros", verificar, resolver(viewController.registros));
router.get("/escanear", verificar, resolver(viewController.escanear));
router.get("/imprimir", verificar, resolver(viewController.imprimir));
router.get("/cadastrar", verificar, resolver(viewController.cadastrar));
router.get("/importar", verificar, resolver(viewController.importar));
router.get("/exportar", verificar, resolver(viewController.exportar));
router.get("/deletar", verificar, resolver(viewController.deletar));
router.get("/atualizar/:id", verificar, resolver(viewController.atualizar));
router.get("/modificar/:email", verificar, resolver(viewController.modificar));
router.get("/uso", resolver(viewController.uso));

// ReadME.md

router.get("/read", resolver(viewController.read));

// Registro Controller

router.get("/registro/listar", registroController.listar);
router.get("/registro/buscar/:email", registroController.buscar);
router.post("/registro/validar", registroController.validar);
router.post("/registro/verificar", registroController.verificar);
router.post("/registro/criar", registroController.criar);
router.put("/registro/atualizar/:email", validar, rateLimiter, registroController.atualizar);
router.delete("/registro/deletar/:email", validar, rateLimiter, registroController.deletar);

// Patrimônio Controller

router.get("/patrimonio/listar", patrimonioController.listar);
router.get("/patrimonio/buscar/:id", patrimonioController.buscar);
router.post("/patrimonio/criar", validar, rateLimiter, patrimonioController.criar);
router.post("/patrimonio/importar", validar, rateLimiter, patrimonioController.importar);
router.post("/patrimonio/exportar", validar, rateLimiter, patrimonioController.exportar);
router.post("/patrimonio/imprimir", validar, rateLimiter, patrimonioController.imprimir);
router.put("/patrimonio/atualizar/:id", validar, rateLimiter, patrimonioController.atualizar);
router.delete("/patrimonio/deletar/:id", validar, rateLimiter, patrimonioController.deletar);
router.delete("/patrimonio/truncar", validar, rateLimiter, patrimonioController.truncar);

module.exports = router;