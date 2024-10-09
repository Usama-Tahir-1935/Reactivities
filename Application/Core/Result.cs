namespace Application.Core
{
    public class Result<T>
    {
        public bool IsSuccess { get; set; }
        public T Value { get; set; }
        public string Error { get; set; }

        // A factory method to create a Result<T> representing a successful operation.
        public static Result<T> Success(T value) => new Result<T> {IsSuccess = true, Value = value};

        // A factory method to create a Result<T> representing a failed operation.
        public static Result<T> Failure(string error) => new Result<T> {IsSuccess = false, Error = error};

    }
}