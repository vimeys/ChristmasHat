// pages/lunbo/lunbo.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
      images:['../../image/1.png','../../image/2.png'],
      image1:['http://news.cnhubei.com/ctjb/ctjbsgk/ctjb40/200808/W020080822221006461534.jpg'],
      time1:5000,
      time2:1000,
      autoplay:true,
      image: {
          src: "../../image/11.png",
          width: 200,
          heigth: 200
      }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  // 获取index
  getIndex(e){
      let index=e.detail.current;
      console.log(index);
  },
    //保存
    save(){
      wx.downloadFile({
        url: this.data.image1[0],
        success: res => {
            console.log(res);
            // wx.saveFile({
            //   tempFilePath: res.tempFilePath,
            //   success: resA=>{
            //     console.log(resA)
                  wx.saveImageToPhotosAlbum({
                      filePath:res.tempFilePath,
                      success:function (res) {
                          console.log(res);
                      }
                  })
              // }
            // })
        }
      });
    },
    saveImage(){
        wx.canvasToTempFilePath({
            canvasId:'myCanvas',
            success:(res)=>{
                wx.saveImageToPhotosAlbum({
                    filePath:res.tempFilePath,
                    success:function (res) {
                        console.log(res);
                    }
                })
            }
        })
    },
    share(){
      let that=this;
        const cvs=wx.createCanvasContext('myCanvas');
        // cvs.drawImage('../../image/11.png',0,0,750,1000);
        cvs.arc(100, 100, 50, 0, 2 * Math.PI);
        cvs.setFillStyle('#EEEEEE')
        cvs.arc(100, 100, 54, 0, 2 * Math.PI);
        cvs.setFillStyle('#000')
        // cvs.setGlobalAlpha(0.2)
        cvs.setTextAlign('center');
        cvs.setFillStyle('red');
        cvs.setFontSize('22');
        cvs.fillText('可可西里',200,300)
        cvs.setTextAlign('center');
        cvs.setFillStyle('red');
        cvs.setFontSize('18');
        cvs.fillText(5+'0.5岁',300,300)
        cvs.stroke();
        // cvs.save();
        // cvs.beginPath();
        // cvs.arc(100,100,50,0,2 * Math.PI);
        // cvs.clip()
        cvs.drawImage(that.data.image.src, 0, 0, that.data.image.width, that.data.image.heigth);
        cvs.drawImage('../../image/1.png', 100, 200, 25, 25);
        // cvs.restore();
        cvs.draw()
    }
});