using api.Handlers;
using api.Models;

namespace api.DB
{
    public class Database
    {
        private readonly string? cs;

        private UserMessageHandler userMessageHandler = new UserMessageHandler();
        private LeaderboardHandler leaderboardHandler= new LeaderboardHandler();

        private static List<UserMessage> AllUserMessages = new List<UserMessage>();
        private static List<Leaderboard> AllLeaderboards = new List<Leaderboard>();

        public Database()
        {
            cs = Environment.GetEnvironmentVariable("CONNECTION_STRING");
        }

        public async Task<List<UserMessage>> GetAllUserMessages()
        {
            if(cs != null)
            {
                AllUserMessages = await userMessageHandler.GetAllUserMessages(cs);
            }
            Console.WriteLine("Database data pulled:");
            foreach(var message in AllUserMessages) {
                Console.WriteLine($"{message.UserId} {message.UserName}");
            }

            // return admin list
            return AllUserMessages;
        }

        public async void AddNewUserMessage(UserMessage userMessage)
        {
            if(cs != null)
            {
                Console.WriteLine($"DB | Adding user {userMessage.UserName}\n\t{userMessage.UserEmail}\n\t{userMessage.UserText}");
                await userMessageHandler.AddNewUserMessage(cs, userMessage);
            }
        }

        public async Task<List<Leaderboard>> GetLeaderboard()
        {
            if(cs != null)
            {
                AllLeaderboards = await leaderboardHandler.GetAllLeaderboardScores(cs);
            }
            Console.WriteLine("Database data pulled:");
            foreach(var score in AllLeaderboards) {
                Console.WriteLine($"{score.UserId} {score.UserName} {score.UserScore}");
            }

            // return admin list
            return AllLeaderboards;
        }

        public async void AddNewLeaderboardScore(Leaderboard leaderboard)
        {
            if(cs != null)
            {
                await leaderboardHandler.AddNewLeaderboardScore(cs, leaderboard);
            }
        }
    }
}