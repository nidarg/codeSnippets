
import styles from '../styles/Note.module.css'
import styleUtils from "../styles/utils.module.css";
import {Note as NoteModel} from '../models/note'
import Card from 'react-bootstrap/Card';
import {formatDate} from '../utils/formatDate'
import { MdDelete } from "react-icons/md";

interface NoteProps{
    note:NoteModel,
    onDeleteClick:(note:NoteModel)=>void,
    className?:string
}

const Note = ({note,className,onDeleteClick}:NoteProps) => {
  const {title,text,createdAt,updatedAt} = note

  let createdUpdatedText:string;
  if(updatedAt > createdAt){
    createdUpdatedText="updated : " + formatDate(updatedAt)
  }else{
    createdUpdatedText="created : " + formatDate(createdAt)
  }

  return (
    <Card className={`${styles.noteCard} ${className}`}>
        <Card.Body className={styles.cardBody}>
           <Card.Title className={styleUtils.flexCenter}>
            
            {title}
            <MdDelete className="ms-auto"
            onClick={(e)=>{
              onDeleteClick(note)
              e.stopPropagation()
            }}
            />
           </Card.Title>
           <Card.Text className= {styles.cardText}>
            {text}
           </Card.Text>
           
        </Card.Body>
        <Card.Footer >
          {createdUpdatedText}    
        </Card.Footer>
    </Card>
  )
}

export default Note