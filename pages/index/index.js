// pages/index/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgPic:null,
    picChoosed:false,
      count:''
  },

  assignPicChoosed() {
    if (this.data.bgPic) {
      this.setData({
        picChoosed: true
      })
    } else {
      this.setData({
        picChoosed: false
      })
    }
  },
  getAvatar() {
    if (app.globalData.userInfo) {
      this.setData({
        bgPic: app.globalData.userInfo.avatarUrl,
      });
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo;
          this.setData({
            userInfo: res.userInfo,
            bgPic: res.userInfo.avatarUrl
          });
          this.assignPicChoosed();
        }
      })
    }
  },
  chooseImage(from){
      console.log(this.data.count);
      if(0<this.data.count<6||this.data.count==''){
        wx.chooseImage({
            count: 6-this.data.count,
            sizeType: ["original", "compressed"],
            sourceType: [from.target.dataset.way],
            success:(res)=> {
                var tempFilePaths = res.tempFilePaths;
                let old=this.data.bgPic||[]
                let newT=res.tempFilePaths;
                let arr=[...old,...newT];
                console.log(arr);
                this.setData({
                    bgPic:arr,
                    count:arr.length
                });
                this.assignPicChoosed();
            },
            fail: (res)=>{
                this.assignPicChoosed();
            },
            complete: (res)=>{
                this.assignPicChoosed();
            },
        })
    }else{
        return
      }

  },
  nextPage(){
      app.globalData.bgPic=this.data.bgPic;
      console.log(app.globalData.bgPic);
      wx.navigateTo({
        url: '../imageeditor/imageeditor',
      })
  }
})