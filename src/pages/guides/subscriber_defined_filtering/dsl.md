---
title: Subscriber Defined Filtering DSL Reference
---

# Subscriber Defined Filtering DSL Reference

Adobe I/O Events Subscriber Defined Filtering (SDF) uses a powerful, JSON-based Domain Specific Language (DSL) to let you precisely control which events you receive. This page provides a comprehensive reference for the supported operators, their syntax, and practical examples using real event payloads.

> **Note:** The SDF DSL is based on a subset of the [Event Ruler DSL](https://github.com/aws/event-ruler?tab=readme-ov-file) (which is also used as the [AWS EventBridge event pattern syntax](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-create-pattern-operators.html)). Some advanced or rarely used operators may not be supported. See the restrictions section below.

## Event Example

Here is a real event payload you might receive from Adobe I/O Events:

```json
{
  "specversion": "1.0",
  "type": "aem.assets.asset.published",
  "source": "author-p12345-e123456.adobeaemcloud.com",
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "time": "2024-04-22T23:26:09.036Z",
  "datacontenttype": "application/json",
  "data": {
    "assetId": "urn:aaid:aem:abcd1234-ab12-ab12-ab12-abcdef123456",
    "user": {
      "imsUserId": "11362B9E62F4CD400A495ECF@09f51d11618ca7b4495ee0.e",
      "principalId": "testuser@adobe.com",
      "displayName": "Test User"
    },
    "tier": "publish",
    "repositoryMetadata": {
      "aem:assetState": "processed",
      "repo:name": "city.jpeg",
      "repo:path": "/content/dam/city.jpeg",
      "repo:size": 338049
    },
    "assetMetadata": {
      "customProperty1": "customValue",
      "customProperty2": true,
      "customProperty3": 1234
    }
  }
}
```

## Supported Operators

| Operator            | Description                                 | Example Syntax                                                                 |
|---------------------|---------------------------------------------|-------------------------------------------------------------------------------|
| `equals`            | Exact match (default)                       | `"type": ["aem.assets.asset.published"]`                                    |
| `anything-but`      | Not equal / not in list                     | `"tier": [{"anything-but": "author"}]`                                      |
| `prefix`            | Value starts with                           | `"repo:path": [{"prefix": "/content/dam/"}]`                               |
| `suffix`            | Value ends with                             | `"repo:name": [{"suffix": ".jpeg"}]`                                       |
| `numeric`           | Numeric comparison                          | `"repo:size": [{"numeric": [">", 100000]}]`                                |
| `exists`            | Field exists or not                         | `"assetMetadata": {"customProperty1": [{"exists": true}]}`                |
| `equals-ignore-case`| Case-insensitive match                      | `"tier": [{"equals-ignore-case": "PUBLISH"}]`                              |
| `$or`               | Logical OR across fields or conditions      | `"$or": [{"tier": ["publish"]}, {"repo:size": [{"numeric": [">", 1000000]}]}]` |

The `and` logical operator is implicit. Fields in JSON objects in the rule are conditions in `and`. 

### Operator Details & Examples

#### 1. `equals` (default)
Matches if the field value is exactly equal to one of the listed values.
```json
{
  "type": ["aem.assets.asset.published", "aem.assets.asset.deleted"]
}
```

#### 2. `anything-but`
Matches if the field value is NOT equal to the given value or values.
```json
{
  "data": {
    "tier": [{"anything-but": "author"}]
  }
}
```

#### 3. `prefix`
Matches if the field value starts with the given string.
```json
{
  "data": {
    "repositoryMetadata": {
      "repo:path": [{"prefix": "/content/dam/"}]
    }
  }
}
```

#### 4. `suffix`
Matches if the field value ends with the given string.
```json
{
  "data": {
    "repositoryMetadata": {
      "repo:name": [{"suffix": ".jpeg"}]
    }
  }
}
```

#### 6. `numeric`
Matches if the field value (number) satisfies the numeric comparison(s).
```json
{
  "data": {
    "repositoryMetadata": {
      "repo:size": [{"numeric": [">", 100000, "<=", 500000]}]
    }
  }
}
```

#### 7. `exists`
Matches if the field exists (or does not exist) in the event.
```json
{
  "data": {
    "assetMetadata": {
      "customProperty1": [{"exists": true}]
    }
  }
}
```

#### 8. `equals-ignore-case`
Matches if the field value equals the given value, ignoring case.
```json
{
  "data": {
    "tier": [{"equals-ignore-case": "PUBLISH"}]
  }
}
```

#### 9. `$or`
Matches if any of the listed conditions are true (logical OR across fields or sub-conditions).
```json
{
  "data": {
    "$or": [
      {"tier": ["publish"]},
      {"repositoryMetadata": {"repo:size": [{"numeric": [">", 1000000]}]}}
    ]
  }
}
```

## Practical Filter Examples

### Example 1: Only receive published JPEG assets larger than 300KB
```json
{
  "type": ["aem.assets.asset.published"],
  "data": {
    "repositoryMetadata": {
      "repo:name": [{"suffix": ".jpeg"}],
      "repo:size": [{"numeric": [">", 300000]}]
    }
  }
}
```

### Example 2: Exclude events for assets in a specific folder
```json
{
  "data": {
    "repositoryMetadata": {
      "repo:path": [{"anything-but": {"prefix": "/content/dam/exclude/"}}]
    }
  }
}
```

### Example 3: Match if asset is published OR asset size is over 1MB
```json
{
  "$or": [
    {"type": ["aem.assets.asset.published"]},
    {"data": {"repositoryMetadata": {"repo:size": [{"numeric": [">", 1000000]}]}}}
  ]
}
```

### Example 4: Only receive events where a custom property exists
```json
{
  "data": {
    "assetMetadata": {
      "customProperty1": [{"exists": true}]
    }
  }
}
```

## Restrictions & Differences from AWS EventBridge

- **Subset of Operators:** Not all AWS EventBridge operators are supported. The most common operators (`equals`, `anything-but`, `prefix`, `suffix`, `numeric`, `exists`, `equals-ignore-case`, `$or`) are available.
- **Filter Size Limit:** There is a maximum size for the filter JSON. Very large filters may be rejected.
- **No Nested `$or` in Reserved Keywords:** `$or` cannot be used inside objects with reserved keywords (e.g., `{ "numeric": ... }`).
- **Leaf Node Matching:** Most operators only work on leaf fields (not objects or arrays), except for `$or` and `anything-but`.
- **No Wildcards:** Wildcard patterns are not supported.
- **Performance/Complexity Limits:** Filters that are too complex (deep `$or` nesting, or too many rule combinations) may be rejected for performance reasons.
- **Case Sensitivity:** By default, string matching is case-sensitive unless `equals-ignore-case` is used.
- **JSON Syntax and Field Names:** Filters must be valid JSON. Field names and values must match the event payload structure exactly.
- **No Duplicate Keys:** If a filter contains matching expression at the same path, the filter is considered invalid to avoid confusion on which expression is applied. 
- **Validation Endpoint:** Always use the filter validation endpoint to check your filter before saving it. This will catch all syntax errors. You can use custom payloads to check whether your filtering logic applies ex expected.

## Best Practices

- **Start Simple:** Begin with basic filters and add complexity as needed.
- **Validate Filters:** Use the filter validation API to test your filters before deploying.
- **Be Specific:** More specific filters are more efficient and less error-prone.
- **Monitor Performance:** Complex filters may impact processing time; keep them as simple as possible.
- **Check Field Names:** Ensure your filter field names match the event payload structure exactly.

## Further Reading
- [AWS EventBridge Pattern Operators](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-create-pattern-operators.html)
- [Event Ruler Syntax](https://github.com/aws/event-ruler?tab=readme-ov-file)
- [Subscriber Defined Filtering Overview](./index.md) 