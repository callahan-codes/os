using api.Models;
using MySqlConnector;

namespace api.Handlers
{
    public class LeaderboardHandler
    {
        public async Task<List<Leaderboard>> GetAllLeaderboardScores(string cs)
        {
            List<Leaderboard> myUserScores = [];

            using var connection = new MySqlConnection(cs);
            await connection.OpenAsync();

            using var command = new MySqlCommand("SELECT * FROM snake_leaderboard ORDER BY user_score DESC LIMIT 10;", connection);
            using var reader = await command.ExecuteReaderAsync();

            while(await reader.ReadAsync())
            {
                int userid = reader.GetInt32(0);
                string username = reader.GetString(1);
                int userscore = reader.GetInt32(2);

                myUserScores.Add(new Leaderboard(){
                    UserId = userid,
                    UserName = username,
                    UserScore = userscore,
                });
            }

            return myUserScores;
        }

        public async Task AddNewLeaderboardScore(string cs, Leaderboard leaderboard)
        {
            using var connection = new MySqlConnection(cs);
            await connection.OpenAsync();
            
            using var command = new MySqlCommand("", connection);
            string? username = leaderboard.UserName;
            int userscore = leaderboard.UserScore;

            command.CommandText = @$"INSERT INTO snake_leaderboard(user_name, user_score) VALUES(@username, @userscore);";
            command.Parameters.AddWithValue("@username", username);
            command.Parameters.AddWithValue("@userscore", userscore);

            command.Prepare();
            command.ExecuteNonQuery();
        }
    }
}