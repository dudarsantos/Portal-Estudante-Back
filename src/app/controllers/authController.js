const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const authConfig = require('../../config/auth');

const User = require('../models/User');
const Discipline = require('../models/Discipline');

const router = express.Router();

// const generateToken= (params = {}) => {
//   return jwt.sign({ id: user.id }, authConfig.secret, {
//     expiresIn: '10d'
//   });
// }

router.post('/register', async (req, res) => {
  const { email } = req.body;
    try{
    if (await User.findOne({ email }))
    return res.status(400).send({ error: 'Usuário já existe'});

    const user = await User.create(req.body);
    user.password = undefined;
    // console.log(user)

    return res.send({ 
      user,
      // token: generateToken({ id: user.id }),
     });
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: 'Falha ao registrar novo usuário' });
  }
});

router.post('/authenticate', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');

  if (!user)
  return res.status(400).send({ error: 'Usuário não encontrado'});

  if (!await bcrypt.compare(password, user.password))
  return res.status(400).send({ error: 'Senha inválida' });

  user.password = undefined;

  res.send({
    user
    // token: generateToken({ id: user.id }),
 });
});

router.put('/update', async (req, res) => {
  try {
    const { _id, email, cpf, password } = req.body;
    
    const user = await User.findByIdAndUpdate( _id , { email, cpf, password }, { new: true });
    if (!user)

    return res.status(400).send({ error: 'Usuário não encontrado' })
    res.send({user})

  } catch (err) {
    return res.status(400).send({ error: 'Falha ao atualizar senha' });
  }

});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if(!user)

    return res.status(400).send({ error: 'email ou senha inválido'})
    if (user.password !== password);

  } catch (err) {
    return res.status(400).send({ error: 'Falha ao fazer login' })
  }

});

router.post('/discipline', async (req, res) => {
  try {
    const { discipline, teacher, students } = req.body;

    const discipline = await Discipline.create({ discipline, teacher, students });
    discipline.save();

    return res.send({ discipline });

  } catch (err) {
    return res.status(400).send({ error: 'Erro ao realizar cadastro' });
    }
});


module.exports = app => app.use('/auth', router);