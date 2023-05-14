using System;

namespace GoHR.Core
{
    class Program
    {
        public static bool IsStartedWithMain { get; private set; }
        static void Main(string[] args)
        {
            IsStartedWithMain = true;
            Console.WriteLine("Hello World!");
        }
    }
}
