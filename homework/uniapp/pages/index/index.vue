<template>
	<view>
			<view style="width: 100%;padding:10px 20px;">
				<button @click="btnPhoto">拍照或从相册选择一张照片</button>
			</view>
			<view style="width: 100%;padding:10px 20px;">
				<image :src="imagepath" style="width: 100%;" mode="widthFix"></image>
				<view v-if="recResults.length>0" style="width: 100%;border:1px solid #ccc;border-radius: 10px;padding:10px;">
					<view style="text-align: center;font-size: 14px;color: #999;">识别结果</view>
					<view v-if="selectedName==''" v-for="item,index in recResults" @click="selectRecResult(index)" style="display: flex;height: 50px;line-height: 50px;">
						<view style="flex: 1;">{{item.keyword}}</view>
						<view>{{(item.score.toFixed(2)*100)+'%'}}</view>
					</view>
					<view v-if="selectedName!=''" style="text-align: center;height: 30px;line-height: 30px;">
						{{selectedName}}
					</view>
					<view v-if="searchResults">
						<view v-if="searchResults.matched" style="width: 100%;text-align: center;">{{searchResults.matched.typename}}</view>
						<view v-else style="font-size: 14px;">
							<view v-for="item,index in searchResults.similars" style="display: flex;">
								<view style="flex: 1;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;margin-right: 20px;">{{item.keywords}}</view>
								<view>{{item.typename}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
</template>

<script>
	export default {
		data() {
			return {
				imagepath:"",
				recResults:[],
				searchResults:null,
				selectedName:""
			}
		},
		onLoad() {

		},
		methods: {
			//拆解需求
			//1.我们从手机相册或拍照获得一张照片，并显示到页面
			btnPhoto(){
				uni.chooseImage({
					count:1,
					success:(res)=>{
						console.log(res);
						this.imagepath=res.tempFilePaths[0];
						this.image2base64(this.imagepath);
					}
				})
			},
			//2.图片转换格式
			image2base64(path){
				
				// #ifdef MP-WEIXIN
					console.log("这是在微信小程序中");
					wx.getFileSystemManager().readFile({
						filePath:path,
						encoding:"base64",
						success:(res)=>{
							console.log(res);
							this.imageClassify(res.data);
						}
					});
				// #endif
				// #ifdef APP-PLUS
					console.log("这是在ios或android中");
					plus.io.resolveLocalFileSystemURL(
						this.imagepath,
						(entry)=>{
							entry.file( ( file ) => {
								let reader = new plus.io.FileReader();
								reader.onloadend = (e) =>{
									console.log( e.target.result );
									const base64 = e.target.result.substr(22);
									
									console.log(base64);
									this.imageClassify(base64);
								};
								reader.readAsDataURL( file );
							});
						}
					);
				// #endif
				
				
			},
			//3.调用百度图像识别API来识别图片
			async imageClassify(b64){
				uniCloud.callFunction({
					name:"ImageClassify",
					data:{
						image:b64
					},
					success: (res) => {
						console.log(res);
						this.parseResults(res.result.result);
					}
				})
				
				// this.parseResults(res.data.result);
			},
			//4.展示图像识别的结果
			parseResults(result){
				this.recResults=result;
				console.log(result);
				let itemlist = [];
				let abs_result_index;
				for(let i = 0;i<result.length;i++){
					if(result[i].score>.7){
						abs_result_index=i;
						break;
					}
					itemlist.push(result[i].keyword+""+result[i].score);
				}
				
				if(abs_result_index>=0){
					this.selectRecResult(abs_result_index);
					return;
				}
				
				uni.showActionSheet({
					itemList:itemlist,
					success: (res) => {
						console.log(res);
						this.selectRecResult(res.tapIndex);
					}
				})
			},
			//5.使用图片识别结果去查询垃圾所属分类，展示结果
			async selectRecResult(index){
				this.selectedName=this.recResults[index].keyword;
				
				console.log(this.selectedName);
				
				const searchRes = await this.searchKeyword(this.selectedName);
				this.searchResults = searchRes;
			},
			searchKeyword(kw){
				return new Promise((resolve,reject)=>{
					uniCloud.callFunction({
						name:"TrashClassify",
						data:{
							keyword:kw
						},
						success: (res) => {
							console.log(res);
							resolve(res.result);
						}
					})
				})
			}
			//6、打包发布微信小程序，和iOS，android
		}
	}
</script>

<style>
	view
	{
		box-sizing: border-box;
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
