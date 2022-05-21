import { TreeNode } from "./treenode.model";

export class BaseNode{
    private name:string;
    private code:string;
    private imagePath:string;
    private parentid:string;
    private childNodes?:BaseNode[];
    constructor(){
    }

    setName(name:string){
         this.name = name
    }
    setCode(code:string){
         this.code = code
    }
    setParentId(parentId:string){
         this.parentid = parentId
    }
    setImagePath(imagePath:string){
         this.imagePath = imagePath
    }
    setchildNode(childNode:BaseNode[]){
         this.childNodes = childNode
    }
    
    get _Name(){
        return this.name 
    }
    get _Code(){
         return this.code 
    }
    get _ParentId(){
         return this.parentid 
    }
    get _imagePath(){
         return this.imagePath
    }
    get childNode(){
         return this.childNodes
    }
}