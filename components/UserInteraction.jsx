export function IconButton({onClick, src}){
    return <button type="button"
        className="icon-button" 
        onClick={onClick}
        style={{backgroundImage:`url(${src})`}}
        >
        
    </button>
}