export const Note = ({content, date}) => {
    //console.log('props', props);
    //const {content, date} = props
  return   (
    <li>
      <p>{content}</p>
        <small>
          {date}
        </small>
    </li>
  );
};