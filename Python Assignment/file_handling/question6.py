def merge_files(file_list, output_file):
    with open(output_file, 'w') as outfile:
        for file_name in file_list:
            with open(file_name, 'r') as infile:
                outfile.write(infile.read() + '\n')
