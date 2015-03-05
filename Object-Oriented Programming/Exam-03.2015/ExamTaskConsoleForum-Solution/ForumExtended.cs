using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using  ConsoleForum.Entities.Posts;

namespace ConsoleForum
{
    class ForumExtended : Forum
    {
        protected override void ExecuteCommandLoop()
        {
            this.Output.AppendFormat("{0}", new string('~', 20)).AppendLine();
            if (base.IsLogged)
            {
                this.Output.AppendFormat(Messages.UserWelcomeMessage, base.CurrentUser.Username).AppendLine();
            }
            else
            {
                this.Output.AppendFormat(Messages.GuestWelcomeMessage).AppendLine();
            }

            var hotQuestions = base.Questions
                .Where(q => q.Answers.Any(a => a is BestAnswers));
            int numberOfHotQuestions = hotQuestions.Count();

            var answers = base.Answers
                .GroupBy(a => a.Author)
                .Where(group => group.Count() >= 3);
            int activeUsers = answers.Count();

            this.Output.AppendFormat(Messages.GeneralHeaderMessage, numberOfHotQuestions, activeUsers).AppendLine();
            this.Output.AppendFormat("{0}", new string('~', 20)).AppendLine();
            Console.Write(this.Output);

            base.ExecuteCommandLoop();
        }
    }
}
