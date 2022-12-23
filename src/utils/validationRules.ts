class Rules {
   static required = (message = 'This field is required!') => {
      return {
         required: true,
         message
      }
   }
}

export default Rules;