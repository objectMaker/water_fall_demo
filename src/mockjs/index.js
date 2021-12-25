import Mock from 'mockjs';

Mock.mock(/\/api\/images/,function (params){
    let sizeArr = [
        '300x250', '250x250', '240x400', '336x280',
        '180x150', '720x300', '468x60', '234x60',
        '88x31', '120x90', '120x60', '120x240',
        '125x125', '728x90', '160x600', '120x600',
        '300x600'
    ]
    let imageArr = [];
    for (let i=0;i<20;i++){
        let info = sizeArr[Math.floor(Math.random()*sizeArr.length)]
        let imageUrl = Mock.Random.image(info)
        let width = info.split('x')[0]
        let height = info.split('x')[1]
        imageArr.push({
            imageUrl,
            width,
            height
        })
    }
    console.log(params)
    return imageArr
})