interface IEvent {
   id: string;
   authorId: string;
   date: string;
   description: string;
   guestsId: string[];
}

export default IEvent;