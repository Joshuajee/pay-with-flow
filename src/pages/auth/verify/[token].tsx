
export const getServerSideProps = async({req, res} : any) => {


    
    return { 
      props: {
        user: null,
      }, 
    }
    
}


interface IProps {
    user: string;
}

export default function VerifyAccount(props: IProps) {


    return (
        <div>

        </div>
    )

}
