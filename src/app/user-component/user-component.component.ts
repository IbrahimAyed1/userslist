import { Component, OnInit } from '@angular/core';
import { TreeNode } from '../Shared/treenode.model';
import USERSLIST from '../../assets/users.json'
import { BaseNode } from '../Shared/basenode';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-user-component',
  templateUrl: './user-component.component.html',
  styleUrls: ['./user-component.component.scss']
})
export class UserComponentComponent implements OnInit {
  
  /**
   * In this component the main goal was to mainpulate data list, first I tried to implement a BST but i found the structure of tree isn't balanced.
   * But i continued searching about building a tree algorithm and traversing through that tree, adding nodes... etc.
   * I didn't deal with the reduce function but when i read the documentation i found that it can group an object wow that's what i wanted.
   * @resources 
   * 1- GG https://www.geeksforgeeks.org/introduction-to-tree-data-structure/
   * 2- MOZ Doc for reduce function. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
   * 
   * for building a recursive HTML component, I used the same technique before but for a different purpose but the was months before but the key was
   * the  [ngTemplateOutletContext]="{ $implicit: usersTree }" 
   * @resources
   * 1-https://indepth.dev/posts/1405/ngtemplateoutlet 
   * 2- Angular ng-template directive https://angular.io/api/core/ng-template
   */

  private usersList:TreeNode[]= USERSLIST;
  private  usersArray :Array<BaseNode>=[];
  public usersTree: BaseNode=new BaseNode();

  constructor() {
    this.mapUserIds();
   } 

   /**
    * This method is going to map every user to a new type of objects which i called Base Node
    * Every Base node has it's code, parent id ( Sperated ) and it will carry thhe children of theat nodes
    */
   mapUserIds(){
     this.usersList.map((user,index)=>{
       let UserCode = user.code.split(".")
       if(UserCode.length <= 1){
        let root:BaseNode = new BaseNode();

        root.setCode(UserCode[UserCode.length - 1])
        root.setImagePath(user.imagePath)
        root.setName(user.name)
        this.usersArray.push(root)
       }
       else{
        let node:BaseNode = new BaseNode();
        node.setCode(UserCode[UserCode.length-1])
        node.setParentId(UserCode[UserCode.length-2])
        node.setImagePath(user.imagePath)
        node.setName(user.name)
        this.usersArray.push(node)
        
       }
     })
   }
  
   /**
    * After Mapping The New User Object To a new Node Object we need to fill in the parent with it's children
    */
  
   mapChildToParent(){
     //Sort The Users Array First
     this.usersArray.sort((user1,user2)=>{
     return user1._ParentId < user2._ParentId? 1:-1;
     })

     const idMapping = this.usersArray.reduce((acc:any, el:BaseNode, i:number) => {
      acc[el._Code] = i;
      return acc;
    }, {});

    let root:BaseNode=new BaseNode();
     const TREE =  this.usersArray.forEach(user => {
        if(!user._ParentId)
        {
          root = user
          this.usersTree = root;
          return
        }
        const parentElement:BaseNode = this.usersArray[idMapping[user._ParentId]]
        parentElement.setchildNode([...(parentElement.childNode|| []),user])
     });
  }

  ngOnInit(): void {
    this.mapChildToParent();
  }

}
