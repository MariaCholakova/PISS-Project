class Server{  
    public static void main(String[] args){  
        System.out.println(System.getenv("DB_USER")); 
        
        try{
            Thread.sleep(1000);
        }
        catch(InterruptedException ex){
            Thread.currentThread().interrupt();
        }
    }  
}
