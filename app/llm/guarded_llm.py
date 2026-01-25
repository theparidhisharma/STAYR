def guarded_generate(prompt, validator):
    response = (
        "This option is stable with high confidence due to strong supplier reliability "
        "and acceptable operational overhead."
    )

    if not validator(response):
        return "Explanation withheld due to validation failure."

    return response
