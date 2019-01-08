import com.mysql.cj.jdbc.MysqlDataSource;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class Connector {

    private final MysqlDataSource dataSource = new MysqlDataSource();
    private Connection con;

    Connection getConnection() throws SQLException {
        dataSource.setServerName("db-server");
        dataSource.setPort(3306);
        dataSource.setDatabaseName("DB_NAME");
        dataSource.setUser("DB_USER");
        dataSource.setPassword("DB_PASS");
        Connection connection = dataSource.getConnection();
        return connection;
    }

    public void openConnection() throws SQLException {
        if (con == null) {
            con = getConnection();
        }
    }

    public void closeConnection() {
        if (con != null) {
            con = null;
        }
    }

    public ResultSet getResultFromSelectQuery(String sql) throws SQLException {
        openConnection();
        Statement st = con.createStatement();
        closeConnection();
        return st.executeQuery(sql);
    }

    public void executeUpdateQuery(String sql) throws SQLException {
        openConnection();
        Statement st = con.createStatement();
        st.executeUpdate(sql);
        closeConnection();
    }
}