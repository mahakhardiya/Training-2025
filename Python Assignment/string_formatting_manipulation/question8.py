import re

def remove_html_tags(text):
    return re.sub(r'<.*?>', '', text)

# Example
print(remove_html_tags("<p>Hello</p>"))  # Output: Hello
