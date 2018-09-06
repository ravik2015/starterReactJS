import createEncryptor from 'redux-persist-transform-encrypt';

const encryptor = createEncryptor({
  secretKey: 'jasdeep-singh'
});

export default encryptor;
