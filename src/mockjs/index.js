import Mock from 'mockjs';

Mock.mock(/\/api\/images/,function (params){
    console.log(params)
    return Mock.Random.image()
})