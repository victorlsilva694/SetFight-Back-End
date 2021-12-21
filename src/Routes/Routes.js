const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const UsersModel = require('../Model/UsersModel');
const jwt = require("jsonwebtoken");
const secret = '{ebd**husebdhuaw**bdahuw**yhdbawhd}';
const apiFighters = require('../APIFigths/API');

router.post('/login/auth', (req, res, next) => {
    const {
        email,
        password
    } = req.body.user;

    UsersModel.findOne({
        where: {
            email: email
        }
    }).then((user) => {
        if (user) {
            bcrypt.compare(password, user.password, (err, success) => {
                if (success) {
                    const token = jwt.sign({
                        User_id: user.id
                    },
                        secret, {
                        expiresIn: '12h',
                    }
                    );
                    res.send({
                        token,
                        email: user.email,
                        name: user.name,
                        lastName: user.lastName,
                        wins: user.wins,
                        loses: user.loses
                    });
                }
            });
        }
    }).catch((err) => {
        console.log(err);
        res.send('err')
    })

});

router.post('/register/save', (req, res, next) => {

    let {
        name,
        lastName,
        cpf,
        rg,
        email,
        password
    } = req.body;

    var Salt = bcrypt.genSaltSync(10);
    var Hash = bcrypt.hashSync(password, Salt);

    if (name !== '' && lastName !== '' && cpf !== '' &&
        rg !== '' && email !== '' && Hash !== '') {
        UsersModel.create({
            name: name,
            lastName: lastName,
            cpf: cpf,
            rg: rg,
            email: email,
            password: Hash
        }).then((e) => {
            res.status(201).send(e)
        });
    } else {
        res.status(404)
    }
});

router.get('/verifyToken', async (req, res, next) => {
    const { authorization } = req.headers;
    if (authorization) {
        const [, token] = authorization.split(' ')
        if (token) {
            const verifed = jwt.verify(token, secret);
            if (verifed.User_id) {
                const searchUser = await UsersModel.findOne({
                    where: {
                        id: verifed.User_id
                    }
                });
                if(searchUser){
                    const {email, name, lastName, wins, loses } = searchUser;
                    res.json({
                        email,
                        name,
                        lastName,
                        wins, 
                        loses
                    })
                    return;
                }
            }
        }
    }
    res.status(404).json({
        message: "user not found",
    })
});

router.post('/register/newUser', (req, res, next) => {
    var Salt = bcrypt.genSaltSync(10);
    var Hash = bcrypt.hashSync("password", Salt);

    UsersModel.create({
        name: "Victor",
        lastName: "Teste",
        cpf: "123123123",
        rg: "12312312312",
        email: "Teset@gmai.com",
        password: Hash,
        wins: 0,
        loses: 0
    }).then((e) => {
        res.status(201).send(e)
    });

});

router.get("/api", (req, res, next) => {
    res.json(apiFighters);
})

const figths = []

router.post("/verifyDataID", (req, res, next) => {
    figths.push({
        id: req.body.id,
        idFighter: req.body.idFighter
    });

    res.json({})
})

router.get("/getIdFight", (req, res, next) => {
    const ArrFight = []
    const percentValues = apiFighters.map((fight) => {
        const count = figths.filter((compareId) => fight.id === compareId.id).reduce((totally, fightValue) => {
            if(fightValue.idFighter === '1') {
                totally.countFighterOne += 1;
            } else{
                totally.countFighterTwo += 1;
            }
            return totally;
        }, {
            countFighterOne: 0,
            countFighterTwo: 0
        });
        const totallyFighter = count.countFighterOne + count.countFighterTwo; 
        return {
            id: fight.id,
            percentFighterOne: (count.countFighterOne / totallyFighter) * 100,
            percentFighterTwo: (count.countFighterTwo / totallyFighter) * 100
        }
    });

    res.json(percentValues);
})

module.exports = router;