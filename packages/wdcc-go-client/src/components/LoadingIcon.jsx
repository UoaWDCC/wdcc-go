import ReactLoading from 'react-loading';

function LoadingIcon() {
  return (<p>
    <ReactLoading className='m-auto' type={"bars"} color='white' height={40} width={40} />
  </p>)
}

export {
  LoadingIcon
}