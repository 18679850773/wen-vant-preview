/**
 * 树选择（输入查找匹配)
 * Author: daizhaohui 2018/08/15
 */
<template>
    <div style="width:100%" ref="treeInputSelectWrapper">
        <bs-popover
            placement="bottom"
            ref="popoverTree"
            :width="popOverWidth"
            v-model="popOverIsVisible"
            trigger="manual"
            popper-class="tree-single-select-popper"
            :disabled="disabled"
            >
            <bs-tree 
                    :data="data" 
                    :props="props" 
                    ref="innerTree"
                    :filter-node-method="filterNode"
                     :disabled="disabled"
            >
            <span  slot-scope="{ node, data }" @click="(e)=>handleNodeClick(e,data)">
                {{node.label}}
                </span>
            </bs-tree>
            <bs-input
                :disabled="disabled"
                slot="reference"
                v-model="inputValue"
                ref="treeInputSelect"
                :placeholder="placeholder"
                style="width:100%;"
                @focus="inputFocus"
                >
                <i
                    class="bs-icon-caret-bottom bs-input__icon"
                    slot="suffix"
                    @click="handleIconClick">
                </i>
             </bs-input>
        </bs-popover>
    </div>

</template>


<script>
export default {
    data:function(){
        return {
            inputValue:"",
            popOverWidth:200,
            popOverIsVisible:false,
            selectedItemData:null
        }
    },
	props: {
        data:{
            type:Array,
            default:[]
        },  
        disabled:{
            type:Boolean,
            default:false
        },
        props:{
            type:Object,
            default:{
                children: 'children',
                label: 'label',
                key:'id'
            }
        },
        placeholder:{
            type:String,
            default:""
        },
        onlyLeafSelected:{
            type:Boolean,
            default:false
        },
        value:{
            type:String,
            default:''
        }
    },
    watch:{
        inputValue(val){
          this.$refs.innerTree.filter(val);
        },
        value(val){
            this.setInputValue(val);
        }
    },
	methods: {
        filterNode(value,data){
            if (!value) return true;
            return data[this.props.label].indexOf(value) !== -1 || data[this.props.key].indexOf(value)!==-1
        },
        handleNodeClick(e,node){
           if(this.onlyLeafSelected){
               if(node[this.props.children] || (node[this.props.children] && node[this.props.children].length>0)){
                   return;
               }
           }
           this.inputValue = node[this.props.label];
           this.popOverIsVisible = false;
           this.selectedItemData = node;
           this.$refs.innerTree.filter("");
           this.$emit("input",node[this.props.key]);
           this.$emit("change",node);   
        },
        handleIconClick(){
            this.popOverIsVisible = true;
            this.$refs.innerTree.filter("");
        },
        resetInputValue(){
            if(this.selectedItemData){
                this.inputValue = this.selectedItemData[this.props.label];
            }
        },
        inputFocus(){
            if(this.inputValue){
                this.$refs.innerTree.filter("");
            }
            if(!this.popOverIsVisible) this.popOverIsVisible = true;     
        },
        handleClick(e){
            var parent = e.target.parentElement;
            var isFinded = false;
            while(parent){
                if(parent===this.$refs.treeInputSelectWrapper){
                    isFinded = true;
                    break;
                } 
                parent = parent.parentElement;
            }
            if(!isFinded){
               this.popOverIsVisible = false;
               this.resetInputValue();
           }
        },
        getInputValue(items,val){
            var inputValue,i,len,item;       
            inputValue = null;
            len = items?items.length:0;
            for(i=0;i<len;i++){
                item = items[i];
                if(item[this.props.key]==val){
                    inputValue = item
                } else {
                    inputValue = this.getInputValue(item[this.props.children],val)
                }
                if(inputValue){
                    break;
                }
            }
            return inputValue;
        },
        setInputValue(val){
            var inputValue;
            inputValue = this.getInputValue(this.data,val);
            if(inputValue){
                this.selectedItemData = inputValue;
                this.resetInputValue();
            }
            
        }
    },
    beforeDestroy(){
        document.removeEventListener("click",this.handleClick);
    },
    mounted(){
      this.popOverWidth = this.$refs.treeInputSelectWrapper.clientWidth-20;
       document.addEventListener("click",this.handleClick);
       this.setInputValue(this.value);
    }
}

</script>

<style lang="scss">
.tree-single-select-popper{
    height: 269px;
    overflow:auto;
}
</style>


