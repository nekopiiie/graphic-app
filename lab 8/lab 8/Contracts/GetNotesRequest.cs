namespace lab_8.Contracts;

public record GetNotesRequest(string? Search, string? SortItem, string? SortOrder);
